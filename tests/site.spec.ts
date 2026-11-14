import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test("homepage renders without broken images or horizontal overflow at all target widths", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await mkdir("docs/screenshots", { recursive: true });
  for (const width of [375, 768, 1024, 1169, 1199, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map(async (image) => {
        await image.decode();
      }));
    });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/We Build Intelligent\s*Hardware & Software/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    expect(await page.locator("img").evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBeTruthy();
    await page.screenshot({ path: `docs/screenshots/homepage-${width}.png`, fullPage: true, animations: "disabled" });
    if (width === 1199) {
      const referencePage = await page.context().newPage();
      await referencePage.setViewportSize({ width: 1199, height: 1312 });
      await referencePage.goto("/");
      await referencePage.locator(".site-footer").scrollIntoViewIfNeeded();
      await referencePage.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(Array.from(document.images).map((image) => image.decode()));
        window.scrollTo({ top: 0, behavior: "instant" });
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      });
      const capture = await referencePage.screenshot({ path: "docs/screenshots/homepage-reference-viewport.png", animations: "disabled" });
      expect(capture.readUInt32BE(16)).toBe(1199);
      expect(capture.readUInt32BE(20)).toBe(1312);
      await referencePage.close();
      console.log("Reference layout", await page.locator(".site-header,.hero,.services-grid,.projects-grid,.about-grid,.cta-banner").evaluateAll((elements) => elements.map((element) => { const rect = element.getBoundingClientRect(); return { element: element.className, x: rect.x, y: rect.y, width: rect.width, height: rect.height }; })));
    }
  }
  expect(errors).toEqual([]);
});

test("mobile menu and section links work", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).focus();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
});

test("project routes, canonical metadata, sitemap and missing pages resolve", async ({ page, request }) => {
  for (const slug of ["vendis", "vendops", "custom-iot"]) {
    await page.goto(`/projects/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://voltnite.com/projects/${slug}`);
    await page.getByRole("link", { name: "All projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
  }
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("https://voltnite.com/projects/vendis");
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/projects/does-not-exist")).status()).toBe(404);
});

test("contact validation preserves the enquiry and provides email redirection to info@voltnite.com", async ({ page, request }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await page.getByLabel("Name", { exact: true }).fill("Sam Example");
  await page.getByLabel("Email", { exact: true }).fill("sam@example.com");
  await page.getByLabel("Project Details").fill("We need help developing a connected IoT payment controller.");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("info@voltnite.com")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open Default Email/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open in Gmail/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy enquiry/i })).toBeVisible();
  expect((await request.post("/api/contact", { data: { name: "a", email: "bad", details: "short" } })).status()).toBe(400);
  expect((await request.post("/api/contact", { data: "malformed", headers: { "Content-Type": "application/json" } })).status()).toBe(400);
  expect((await request.post("/api/contact", { data: {}, headers: { Origin: "https://untrusted.example" } })).status()).toBe(403);
  expect((await request.post("/api/contact", { data: { details: "x".repeat(21_000) } })).status()).toBe(413);
});

test("project and contact pages fit tablet and mobile screens", async ({ page }) => {
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 812 });
    for (const route of ["/projects", "/projects/vendis", "/projects/vendops", "/projects/custom-iot", "/contact"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    }
  }
});
