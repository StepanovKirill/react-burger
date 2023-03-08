export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setCookie(name: string, value: string, options: any = {}): void {
  const newOptions = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    newOptions.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const optionKeys = Object.keys(newOptions);
  optionKeys.forEach((optionKey) => {
    updatedCookie += `;${optionKey}`;
    const optionValue = newOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', {
    'max-age': -1,
  });
}
