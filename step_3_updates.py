import re
import os
import glob

def process_updates(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Logo "Abbasoğlu təmizlik" instead of Cleaninger and icon from navbar and footer
    # Replace anything with class="logo* " or "footer-logo*" that is an img
    logo_regex = r'<img[^>]*class="[^"]*(?:logo|footer-logo)[^"]*"[^>]*>'
    # Insert custom div
    logo_div = '<div style="font-size: 24px; font-weight: 800; font-family: \'Noto Sans\', sans-serif; color: inherit;">Abbasoğlu təmizlik</div>'
    content = re.sub(logo_regex, logo_div, content)

    # 2. Number and Address updates
    # 055 444 16 02 and 221 Ahmad Rajabli, Baku 5075
    content = content.replace('+994 50 000 00 00', '055 444 16 02')
    content = content.replace('+1 (234) 567-8901', '055 444 16 02')
    content = content.replace('+1(234)567-8901', '055 444 16 02')
    content = content.replace('tel:+1-394-495-5993', 'tel:055 444 16 02')
    content = content.replace('tel:+1(234)567-8901', 'tel:055 444 16 02')
    
    content = content.replace('544 Honey Creek Rd.<br/>West Des Moines, IA 50265', '221 Ahmad Rajabli, Baku 5075')
    content = content.replace('544 Honey Creek Rd. West Des Moines, IA 50265', '221 Ahmad Rajabli, Baku 5075')

    # 3. Make all contact buttons work and direct to https://wa.link/bg23ku
    # Note: We replaced 'href="contact.html"' previously in the links.
    content = re.sub(r'href="contact\.html"', 'href="https://wa.link/bg23ku"', content)

    # 4. Specific text replacement
    old_text = 'Abbasoğlu təmizlik xidməti: «ABBASOĞLU» təmizlik xidməti 2012-ci ildən təmizlik bazarında fəaliyyət göstərir.'
    new_text = 'Abbasoğlu təmizlik xidməti 2012-ci ildən təmizlik bazarında fəaliyyət göstərir.'
    content = content.replace(old_text, new_text)

    # 5. Remove all More about buttons and texts (e.g. read more or more about)
    more_about_regex = r'<a[^>]*>(?:(?!</a>).)*?<div[^>]*>\s*More about\s*</div>.*?</a>'
    content = re.sub(more_about_regex, '', content, flags=re.DOTALL)
    
    # Just in case there are "More about" plain texts inside divs
    more_about_simple = r'<div class="button-link"[^>]*>Read more</div>'
    content = re.sub(more_about_simple, '', content)

    # 6. Remove Made in Webflow badge completely from DOM
    webflow_badge_regex = r'<a[^>]*class="w-webflow-badge"[^>]*>.*?</a>'
    content = re.sub(webflow_badge_regex, '', content, flags=re.DOTALL)

    # 7. Remove pricing from all pages
    # `<section class="pricing-section.*?</section>`
    pricing_regex = r'<section[^>]*class="[^"]*\bpricing(?:-section)?\b[^"]*"[^>]*>.*?</section>'
    content = re.sub(pricing_regex, '', content, flags=re.DOTALL)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in glob.glob('*.html'):
    process_updates(filename)
