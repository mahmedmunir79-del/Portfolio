/**
 * Portfolio visit alert — Google Apps Script web app.
 *
 * Receives one anonymous visit summary from the Netlify Function (netlify/functions/visit.mjs)
 * and emails it to the Google account that owns this script. No email address and no secret
 * are written in this file:
 *   - the secret lives in Project Settings → Script Properties → VISIT_SECRET
 *   - the email goes to Session.getEffectiveUser() (the script owner)
 * Deploy as a web app: Execute as "Me", Who has access "Anyone".
 */
function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var secret = PropertiesService.getScriptProperties().getProperty('VISIT_SECRET');
    if (!secret || d.secret !== secret) return ContentService.createTextOutput('');

    var place = [d.city, d.region, d.country].filter(function (x) { return x; }).join(', ');
    var subject = (d.preview ? '[PREVIEW] ' : '') + '👀 Portfolio visit — ' +
      [d.city, d.country].filter(function (x) { return x; }).join(', ') + ' · ' + (d.foundVia || 'Unknown');

    var rows = [
      ['When', d.when],
      ['Where', (d.flag ? d.flag + ' ' : '') + place],
      ['Device', [d.device, d.os, d.browser].join(' · ')],
      ['Found via', d.foundVia],
      ['Page', d.page]
    ];
    var footer = 'Anonymous visit alert from your portfolio. IP addresses are not collected.';

    var body = rows.map(function (r) { return r[0] + ': ' + (r[1] || '—'); }).join('\n') + '\n\n' + footer;
    var html =
      '<div style="font-family:Arial,sans-serif;max-width:480px;border:1px solid #E1E8E5;border-radius:12px;overflow:hidden">' +
      '<div style="background:#0F1E28;color:#fff;padding:14px 18px;font-weight:bold">' + esc(subject) + '</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px">' +
      rows.map(function (r) {
        return '<tr><td style="padding:8px 18px;color:#5A717C;width:90px;vertical-align:top">' + esc(r[0]) +
          '</td><td style="padding:8px 18px;color:#0F1E28">' + esc(r[1] || '—') + '</td></tr>';
      }).join('') +
      '</table><div style="padding:12px 18px;font-size:12px;color:#8FA6B2;border-top:1px solid #E1E8E5">' + esc(footer) + '</div></div>';

    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: subject,
      body: body,
      htmlBody: html,
      name: 'Portfolio visit alert'
    });
  } catch (err) {
    // stay silent: never return details to the caller
  }
  return ContentService.createTextOutput('');
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
  });
}
