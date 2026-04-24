import type { FormData } from './types';
import { featureIcons } from './icons';

// ── Category Icons ─────────────────────────────────────────────────────────
function getToggleSwitchIcon(iconName?: string): string {
  if (iconName && featureIcons[iconName]) {
    return `<img src="${featureIcons[iconName]}" height="32" alt="icon" style="display:inline-block;height:32px;width:auto;vertical-align:middle;margin-right:12px;border:0;">`;
  }
  return '';
}

// ── Main generator ─────────────────────────────────────────────────────────
export function generateEmailHTML(data: FormData): string {
  const brand = data.brandColor || '#f97316';
  const company = data.companyName || 'OrangeHRM';
  const product = data.productName || 'OrangeHRM';
  const version = data.version || '8.1';
  const tagline = data.tagline || 'Is Out As a Stable Version';
  const logoSrc = data.logoUrl || 'data:image/png;base64,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';
  const logoElement = `<img src="${logoSrc}" height="60" alt="${company}" style="display:inline-block;height:60px;width:auto;max-width:200px;border:0;">`;


  const innerBg = 'background-color:#050a1f;';


  // ── Feature category glass cards ──────────────────────────────────────────
  const categoriesHTML = data.featureCategories
    .filter(c => c.name.trim() && c.items.some(i => i.text.trim()))
    .map(cat => {
      const itemsHTML = cat.items
        .filter(i => i.text.trim())
        .map(i => `
          <tr>
            <td valign="top" style="padding:0 8px 0 0;width:12px;">
              <span style="color:#ffffff;font-size:18px;line-height:1.4;">&#8226;</span>
            </td>
            <td valign="top" style="padding:0 0 0 0;">
              <span style="color:#ffffff;font-size:15px;line-height:1.4;font-weight:400;font-family:'Inter',sans-serif;">${i.text}</span>
            </td>
          </tr>`).join('');
      return `
      <tr><td style="padding:0 40px 16px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="
          background:rgba(13,17,33,0.7);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:24px;
        ">
          <tr><td style="padding:20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle" style="padding-bottom:8px; gap: 5px;">
                  ${getToggleSwitchIcon(cat.iconName)}
                  <span style="color:#ffffff;font-size:24px;font-weight:700; padding-left: 15px;line-height:1;vertical-align:top;letter-spacing:-0.02em;font-family:'Inter',sans-serif;">${cat.name}</span>
                </td>
              </tr>
              <tr><td style="padding-left:${(cat.iconName && featureIcons[cat.iconName]) ? '44px' : '0px'};">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHTML}
                </table>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>`;
    }).join('');

  const enhancementsRowsHTML = data.enhancements
    .filter(e => e.text.trim() && e.text.trim().toLowerCase() !== 'none')
    .map(e => {
      const iconName = e.iconName === undefined ? 'icon_04' : e.iconName;
      const iconSrc = iconName ? featureIcons[iconName] : undefined;
      return `
          <tr>
            <td valign="top" style="padding:0 12px 8px 0;width:32px;">
              ${iconSrc ? `<img src="${iconSrc}" height="32" alt="icon" style="display:inline-block;height:32px;width:auto;vertical-align:middle;border:0;">` : `<span style="color:rgba(255,255,255,0.7);font-size:15px;">&#9658;</span>`}
            </td>
            <td valign="middle" style="padding:0 0 8px 0;">
              <span style="font-size:15px;color:#cbd5e1;font-weight:400;font-family:'Inter',sans-serif;line-height:1.6;">${e.text}</span>
            </td>
          </tr>`;
    }).join('');

  const enhancementsHTML = enhancementsRowsHTML ? `
      <tr><td style="padding:12px 40px 28px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="
          background:rgba(13,17,33,0.7);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:24px;
        ">
          <tr><td style="padding:20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${enhancementsRowsHTML}
            </table>
          </td></tr>
        </table>
      </td></tr>` : '';

  const demoButtonsHTML = data.demoButtons
    .filter(b => b.label.trim())
    .map(b => `<tr><td style="padding:10px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="border:2px solid #ffffff;border-radius:50px;text-align:center;background:rgba(255,255,255,0.06);">
          <a href="${b.url || '#'}" style="display:block;padding:10px 16px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;font-family:'Inter',sans-serif;">${b.label}</a>
        </td></tr>
      </table>
    </td></tr>`).join('');

  const highlightVideoBtn = data.highlightVideoUrl
    ? `<tr><td style="padding:16px 40px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border:2px solid #ffffff;border-radius:50px;text-align:center;background:rgba(255,255,255,0.06);"><a href="${data.highlightVideoUrl}" style="display:block;padding:10px 16px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;font-family:'Inter',sans-serif;">&#127916; Watch the Video</a></td></tr></table></td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${product} ${version} Release</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#F0F1F5;" bgcolor="#F0F1F5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F1F5" style="background-color:#F0F1F5;padding:40px 0;">
<tr><td align="center">
<table width="800" cellpadding="0" cellspacing="0" align="center" bgcolor="#050a1f" style="background-color:#050a1f;width:800px;max-width:800px;margin:0 auto;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">

  <!-- Top Branding Area -->
  <tr><td style="text-align:center;padding:40px 40px 0px;">
    <!-- Logo centered -->
    <div style="margin-bottom:0px;">
      ${logoElement}
    </div>
    <!-- Title and Tagline -->
    <div style="position:relative;z-index:20;">
      <h1 style="margin:0;font-size:64px;font-weight:800;color:#ffffff;letter-spacing:-0.04em;text-transform:uppercase;line-height:1.1;">
        ${product} <span style="color:#f59e0b;">${version}</span>
      </h1>
      <p style="margin:10px 0 0 0;font-size:24px;color:#cbd5e1;font-weight:400;">${tagline}</p>
    </div>
  </td></tr>

  <!-- Hero Image Area -->
  ${data.heroImageUrl ? `<tr><td align="center" style="line-height:0;padding:0; width="800px"><img src="${data.heroImageUrl}" alt="Hero" style="display:block;width:800px;max-width:1000px;height:auto;border:0;outline:none;text-decoration:none;margin:0;padding:0;-ms-interpolation-mode:bicubic;"></td></tr>` : ''}


  <tr><td style="${innerBg}text-align:center;padding:8px 40px 16px;">
    <p style="margin:0;font-size:11px;font-weight:700;color:${brand};letter-spacing:4px;text-transform:uppercase;">WHAT'S NEW</p>
    <h2 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;font-family:'Inter',sans-serif;">Features</h2>
    <div style="height:2px;background:linear-gradient(90deg,transparent,${brand},transparent);border-radius:2px;margin-top:10px;"></div>
  </td></tr>

  ${categoriesHTML ? `<tr><td style="${innerBg}padding:4px 0 20px;"><table width="100%" cellpadding="0" cellspacing="0">${categoriesHTML}</table></td></tr>` : ''}

  <tr><td style="${innerBg}text-align:center;padding:32px 40px 16px;">
    <p style="margin:0;font-size:11px;font-weight:700;color:${brand};letter-spacing:4px;text-transform:uppercase;">HIGHLIGHTS</p>
    <h2 style="margin:10px 0 8px;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;font-family:'Inter',sans-serif;">${data.highlightTitle || 'NEW FEATURE HIGHLIGHTS'}</h2>
    <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.6;font-weight:400;font-family:'Inter',sans-serif;">${(data.highlightDesc || '').replace(/\n/g, '<br>')}</p>
  </td></tr>
  ${data.highlightImageUrl ? `<tr><td align="center" style="line-height:0;padding:0;"><img src="${data.highlightImageUrl}" alt="Highlight" style="display:block;width:100%;max-width:1000px;height:auto;border:0;outline:none;text-decoration:none;margin:0;padding:0;-ms-interpolation-mode:bicubic;"></td></tr>` : ''}
  ${highlightVideoBtn}

  ${enhancementsHTML ? `
  <tr><td style="${innerBg}padding:28px 40px 8px;text-align:center;">
    <p style="margin:0;font-size:11px;font-weight:700;color:${brand};letter-spacing:4px;text-transform:uppercase;">UPDATES</p>
    <h2 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;font-family:'Inter',sans-serif;">Enhancements</h2>
  </td></tr>
  ${enhancementsHTML}` : ''}

  ${data.hostedEnvEnabled ? `
  <tr><td style="${innerBg}text-align:center;padding:36px 40px 20px;">
    <p style="margin:0;font-size:11px;font-weight:700;color:${brand};letter-spacing:4px;text-transform:uppercase;">TRY IT NOW</p>
    <h2 style="margin:10px 0 12px;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;font-family:'Inter',sans-serif;">Hosted Environment</h2>
    <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.6;font-weight:400;font-family:'Inter',sans-serif;">${data.hostedEnvDesc || ''}</p>
  </td></tr>
  ${data.hostedEnvImageUrl ? `<tr><td align="center" style="line-height:0;padding:0;"><img src="${data.hostedEnvImageUrl}" alt="Hosted Env" style="display:block;width:100%;max-width:1000px;height:auto;border:0;outline:none;text-decoration:none;margin:0;padding:0;-ms-interpolation-mode:bicubic;"></td></tr>` : ''}
  <tr><td style="${innerBg}padding:20px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.01);border-radius:14px;backdrop-filter:blur(80px);-webkit-backdrop-filter:blur(80px);">
      <tr><td style="padding:18px 20px;">
        ${data.hostedUrl ? `<p style="margin:0 0 12px;text-align:center;font-size:15px;font-family:'Inter',sans-serif;"><span style="color:${brand};">URL: </span><a href="${data.hostedUrl}" style="color:${brand};font-size:15px;text-decoration:none;">${data.hostedUrl}</a></p>` : ''}
        ${data.adminUser ? `<p style="margin:8px 0;text-align:center;font-size:15px;color:#ffffff;font-family:'Inter',sans-serif;">Admin Account: UN: ${data.adminUser} | PW: ${data.adminPass}</p>` : ''}
        ${data.sysadminUser ? `<p style="margin:8px 0;text-align:center;font-size:15px;color:#ffffff;font-family:'Inter',sans-serif;">Sysadmin Account: UN: ${data.sysadminUser} | PW: ${data.sysadminPass}</p>` : ''}
        ${data.generalPass ? `<p style="margin:8px 0 0;text-align:center;font-size:15px;color:#ffffff;font-family:'Inter',sans-serif;">For any other user, use this password : PW: ${data.generalPass}</p>` : ''}
      </td></tr>
    </table>
  </td></tr>` : ''}

  ${data.demoTitle || data.demoButtons.some(b => b.label.trim()) || data.demoImageUrl ? `
  <tr><td style="${innerBg}text-align:center;padding:32px 40px 12px;">
    <h2 style="margin:0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.02em;white-space:pre-line;font-family:'Inter',sans-serif;">${data.demoTitle || 'Stakeholder Demo\nVideo & Slide'}</h2>
  </td></tr>
  ${data.demoImageUrl ? `<tr><td align="center" style="line-height:0;padding:0;"><img src="${data.demoImageUrl}" alt="Demo" style="display:block;width:100%;max-width:1000px;height:auto;border:0;outline:none;text-decoration:none;margin:0;padding:0;-ms-interpolation-mode:bicubic;"></td></tr>` : ''}
  <tr><td style="${innerBg}padding:8px 0 24px;"><table width="100%" cellpadding="0" cellspacing="0">${demoButtonsHTML}</table></td></tr>` : ''}

  <tr><td style="background:linear-gradient(135deg,${brand}22,${brand}44);border-top:1px solid rgba(255,255,255,0.1);text-align:center;padding:22px 40px;">
    <p style="margin:0;color:rgba(255,255,255,0.9);font-size:14px;font-weight:600;">${data.footerText || 'Bring Innovation to Human Resource Management !!!'}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}


