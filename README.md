# TelegramBypass

دور زدن فیلترینگ تلگرام به کمک ورکر برای استفاده در سرورهای ایران.

## راه‌اندازی Cloudflare Worker

وارد وب‌سایت کلادفلر بشید و یک اکانت بسازید.

1. از منوی سمت چپ گزینه **Workers** رو انتخاب کنید.
2. در وسط صفحه روی دکمه آبی‌رنگ **Create Application** کلیک کنید.
3. گزینه آبی‌رنگ **Create Worker** رو انتخاب کنید.
4. یک اسم برای Worker خودتون انتخاب کنید.
5. روی دکمه آبی‌رنگ **Deploy** بزنید.
6. در صفحه بعد، محتویات فایل `index.js` رو کپی کنید و داخل Worker قرار بدید.

تمام! Worker شما آماده است.

حالا آدرس Worker رو بردارید و به‌جای آدرس API تلگرام قرار بدید و ازش استفاده کنید.

## استفاده روی سرورهای ایران اکسس

اگر سروری که می‌خواید بات رو روی اون اجرا کنید **ایران‌اکسس** بود، برای اون هم راه‌حل وجود داره.

در این حالت باید یک Worker روی **ArvanCloud** اجرا کنید و درخواست‌ها رو از طریق آروان به Cloudflare پروکسی کنید.

از کد زیر استفاده کنید:

```js
export default {
  async fetch(request) {
    const url = new URL(request.url)

    const targetUrl =
      `https://your-cloudflare-worker.workers.dev${url.pathname}${url.search}`

    return fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.arrayBuffer()
          : undefined,
    })
  },
}
```

بعد از Deploy کردن Worker روی آروان، درخواست‌های API تلگرام رو به آدرس Worker آروان ارسال کنید تا درخواست‌ها از طریق آن به Worker کلادفلر منتقل شوند.
