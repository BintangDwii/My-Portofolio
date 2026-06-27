# Tambah tombol theme toggle di mobile drawer

## File yang diubah
1. `index.html`
2. `script.js`

## 1. `index.html` — Mobile drawer (line 109–110)

Sisipkan button `#theme-toggle-mobile` setelah "Book A Call" dan sebelum social icons:

```html
<button id="theme-toggle-mobile" class="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition" aria-label="Toggle theme">
  <svg class="sun-icon-mobile" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  <svg class="moon-icon-mobile hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
  <span class="theme-label">Theme</span>
</button>
```

## 2. `script.js` — Update `setTheme()` & tambah listener

Di `script.js` bagian dark mode toggle (sekitar line 59–86):

### a. Query mobile icons
```js
const mobileSun = document.querySelector('.sun-icon-mobile');
const mobileMoon = document.querySelector('.moon-icon-mobile');
const mobileLabel = document.querySelector('.theme-label');
```

### b. Update `setTheme()` untuk juga toggle mobile icons
```js
function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
    mobileSun?.classList.add('hidden');
    mobileMoon?.classList.remove('hidden');
    if (mobileLabel) mobileLabel.textContent = 'Dark';
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
    mobileSun?.classList.remove('hidden');
    mobileMoon?.classList.add('hidden');
    if (mobileLabel) mobileLabel.textContent = 'Light';
  }
}
```

### c. Tambah listener untuk `#theme-toggle-mobile`
```js
document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});
```
