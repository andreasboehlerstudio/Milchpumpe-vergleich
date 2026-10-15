export type NewsletterConnection = Readonly<{
  formUrl: string | null;
  senderVerified: boolean;
  doubleOptInVerified: boolean;
  pdfDeliveryVerified: boolean;
  unsubscribeVerified: boolean;
  privacyNoticePublished: boolean;
}>;

// Public connection metadata only. Never put a provider API key or contact data here.
// Keep every check false until the real configured account/flow has been read back.
export const NEWSLETTER_CONNECTION: NewsletterConnection = {
  formUrl: null,
  senderVerified: false,
  doubleOptInVerified: false,
  pdfDeliveryVerified: false,
  unsubscribeVerified: false,
  privacyNoticePublished: false,
};

export function isNewsletterReady(connection: NewsletterConnection): boolean {
  if (!connection.formUrl || !connection.senderVerified || !connection.doubleOptInVerified || !connection.pdfDeliveryVerified || !connection.unsubscribeVerified || !connection.privacyNoticePublished) return false;
  try {
    const url = new URL(connection.formUrl);
    return url.protocol === 'https:' && !url.username && !url.password && url.hostname.endsWith('.sibforms.com') && url.pathname.startsWith('/serve/') && url.pathname.length > '/serve/'.length;
  } catch {
    return false;
  }
}
