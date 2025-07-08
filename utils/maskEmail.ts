export function maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    const len = username.length;
  
    if (len <= 3) return '*'.repeat(len) + '@' + domain;
    if (len <= 6) return username.slice(0, 1) + '*'.repeat(len - 1) + '@' + domain;
  
    const visible = Math.floor(len / 3);
    const start = username.slice(0, visible);
    const end = username.slice(-visible);
    const masked = '*'.repeat(len - start.length - end.length);
  
    return `${start}${masked}${end}@${domain}`;
  }
  