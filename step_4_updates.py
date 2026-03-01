import re
import glob

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Task 1: services.html specific text translations
    if filename == 'services.html':
        translations = {
            'Projects completed': 'Tamamlanmış layihə',
            'Client retention rate': 'Məmnun müştəri',
            'Professional cleaners': 'Peşəkar əməkdaş',
            'Request a service': 'Xidmət sifariş edin',
            '>Book an appointment<': '>Göndər<',
            'value="Book an appointment"': 'value="Göndər"',
            'data-wait="Please wait..."': 'data-wait="Gözləyin..."',
            'Oops! Something went wrong while submitting the form.': 'Xəta! Müraciətiniz göndərilərkən problem yaşandı.',
            'Thank you! Your submission has been received!': 'Təşəkkürlər! Müraciətiniz qəbul edildi!',
            '>OR<': '>VƏ YA<',
            'Call us on': 'Bizimlə əlaqə:',
            'Frequently asked questions': 'Tez-tez verilən suallar',
            '<title>Services | Cleaninger - Webflow HTML website template</title>': '<title>Xidmətlər | Abbasoğlu təmizlik</title>'
        }
        for eng, aze in translations.items():
            content = content.replace(eng, aze)
            
    # Task 2: Remove email from footer
    email_regex = r'<div class="footer-detail"><img[^>]*alt="Email Icon"[^>]*><a[^>]*>info@example\.com</a></div>'
    content = re.sub(email_regex, '', content)

    # Task 3: Mysite link
    content = content.replace(
        '<p class="footer-copyright">Developed by Mysite</p>',
        '<p class="footer-copyright">Developed by <a href="https://mysitesolutions.app/" target="_blank" style="color: inherit; text-decoration: underline;">Mysite</a></p>'
    )

    # Task 4: Remove Ətraflı button from üstünlüklərimiz (in index.html)
    content = re.sub(r'<a href="blog\.html"[^>]*>Ətraflı</a>', '', content)

    # Task 5: Logo in white color
    # Previously: color: inherit;">Abbasoğlu təmizlik</div>
    content = content.replace('color: inherit;">Abbasoğlu təmizlik</div>', 'color: #ffffff;">Abbasoğlu təmizlik</div>')

    # Task 6: Remove logo section below the Hero (client-section)
    client_section_regex = r'<section class="client-section">.*?</section>'
    content = re.sub(client_section_regex, '', content, flags=re.DOTALL)

    # Task 7: Remove Arrow from services and disable linking
    # 7.1 Re-route href="service-static.html" to "javascript:void(0);"
    content = content.replace('href="service-static.html"', 'href="javascript:void(0);"')
    # 7.2 Remove arrow icon wrapper from index.html (service-arrow-icon-wrap)
    content = re.sub(r'<div class="service-arrow-icon-wrap[^>]*>.*?</div>', '', content, flags=re.DOTALL)
    # 7.3 Remove "Ətraflı oxu" button-link from services.html
    content = re.sub(r'<div class="button-link">Ətraflı oxu</div>', '', content)

    # Task 8: Footer socials update & removal of Twitter (X)
    content = content.replace('href="https://www.facebook.com/"', 'href="https://www.facebook.com/abbasoglu.t.mizlik.xidm.ti/"')
    content = content.replace('href="https://www.instagram.com/"', 'href="https://www.instagram.com/cleaning.abbasogli/reels/"')
    
    # Remove twitter
    twitter_regex = r'<a href="https://twitter\.com/"[^>]*>.*?<img[^>]*alt="Twitter Icon"[^>]*>.*?</a>'
    content = re.sub(twitter_regex, '', content, flags=re.DOTALL)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in glob.glob('*.html'):
    process_file(filename)
