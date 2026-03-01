import re
import os
import glob

def process_html_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Use Noto fonts
    # Add Google Fonts link to <head> if not present
    if "fonts.googleapis.com/css2?family=Noto+Sans" not in content:
        font_link = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">\n<style>body, h1, h2, h3, h4, h5, h6, p, a, div, span, label, input, select, textarea { font-family: "Noto Sans", sans-serif !important; }</style>\n</head>'
        content = content.replace("</head>", font_link)

    # 2. Remove "Pages" from navbar
    # Regex to match the Pages dropdown div completely
    dropdown_regex = r'<div[^>]*class="[^"]*dropdown[^"]*"[^>]*>.*?<div[^>]*class="[^"]*dropdown-toggle[^"]*"[^>]*>.*?<div>Pages</div>.*?</div>.*?<nav[^>]*class="[^"]*dropdown-list[^"]*"[^>]*>.*?</nav></div>'
    content = re.sub(dropdown_regex, '', content, flags=re.DOTALL)
    
    # Also in some places it might be a different structure, let's just make sure we capture it.
    dropdown_regex2 = r'<div[^>]*class="dropdown w-dropdown".*?<div>Pages</div>.*?</nav></div>'
    content = re.sub(dropdown_regex2, '', content, flags=re.DOTALL)

    # 3. Remove badges and templates links
    more_templates_regex = r'<a href="https://webflow\.com/templates/designers/[^"]*"[^>]*>.*?<div>More Templates</div></a>'
    content = re.sub(more_templates_regex, '', content, flags=re.DOTALL)

    access_paas_regex = r'<div class="access-paas">.*?</div></div></div></div>'
    # Actually the access-paas div is fairly deep. Let's do a more robust approach:
    # Remove from <div class="access-paas"> to the ending </div> before <script src="https://d3e54v103j8qbb.cloudfront.net...
    access_regex = r'<div class="access-paas">.*?<script src="https://d3e54v103j8qbb'
    content = re.sub(access_regex, '<script src="https://d3e54v103j8qbb', content, flags=re.DOTALL)
    
    # Remove the generic Webflow badge if it exists
    webflow_badge_regex = r'<a class="w-webflow-badge".*?</a>'
    content = re.sub(webflow_badge_regex, '', content, flags=re.DOTALL)

    # 4. Remove english webpages from footer
    # We want to keep Ana Səhifə, Xidmətlər, Haqqımızda, Əlaqə
    # Let's replace the whole footer-links grid with a simplified version
    footer_links_regex = r'<div data-w-id="[^"]*" class="footer-links">.*?</div><div data-w-id="[^"]*" class="footer-links">.*?</div></div>'
    
    simplified_footer = '''<div class="footer-links">
        <a href="index.html" class="footer-link">Ana Səhifə</a>
        <a href="about.html" class="footer-link">Haqqımızda</a>
        <a href="services.html" class="footer-link">Xidmətlər</a>
        <a href="contact.html" class="footer-link">Əlaqə</a>
    </div></div>'''
    content = re.sub(footer_links_regex, simplified_footer, content, flags=re.DOTALL)

    # 5. Add "Developed by Mysite" to footer
    copyright_regex = r'Designed by <a href="[^"]*"[^>]*>[^<]*</a>, Powered by <a href="[^"]*"[^>]*>[^<]*</a>'
    content = re.sub(copyright_regex, 'Developed by Mysite', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

services_replacements = {
    '>Services<': '>Xidmətlər<',
    '>Home<': '>Ana Səhifə<',
    '>About<': '>Haqqımızda<',
    '>Contact us<': '>Əlaqə<',
    '>Claim your free first Cleaning today.<': '>Premium xidmət sifariş etmək üçün elə indi bizimlə əlaqə saxlayın.<',
    '>Call us: +1-394-495-5993<': '>Zəng edin: +994 50 000 00 00<',
    '>Claim free visit<': '>Təklif Alın<',
    '>We handle repairs &amp; maintenance for all appliances with expertise &amp; efficiency to ensure your appliances.<': '>Uzunmüddətli tərəfdaşlıq üçün sistemli, peşəkar və yüksək standartlara uyğun təmizlik.<',
    
    # Hero
    '>Expert cleaning solutions<': '>Ekspert təmizlik həlləri<',
    '>We pride ourselves on delivering top-tier cleaning services tailored to your unique needs.<': '>Biz sizin unikal ehtiyaclarınıza uyğunlaşdırılmış ən yüksək səviyyəli təmizlik xidmətləri təqdim etməkdən qürur duyuruq.<',
    '>Book a service<': '>Təklif Al<',
    
    # Services
    '>Our services<': '>Xidmətlərimiz<',
    '>We offer comprehensive service<': '>Tam əhatəli xidmətlər təklif edirik<',
    '>Office cleaning<': '>Ofis və Biznes mərkəzi<',
    '>Designed to maintain a pristine &amp; productive workspace, tailored to your business needs.<': '>Sabit və yüksək səviyyəli xidmət. Müqaviləli xidmət və keyfiyyət hesabatı.<',
    '>Window cleaning<': '>Fasad və Şüşə<',
    '>Crystal-clear window cleaning services that brighten your view of your property.<': '>Binaların fasad və şüşələrinin peşəkar yuyulması. Sənaye alpinistləri.<',
    '>Carpet cleaning<': '>İctimai yerlərin təmizliyi<',
    '>Removes dirt, stains, and allergens, leaving your carpets fresh and revitalized.<': '>İctimai yerlərin gündəlik, əsaslı, təmir sonrası təmizliyi. Kovrolit və mərmər səthlərin yuyulması.<',
    '>Bedroom cleaning<': '>Təmir Sonrası Təmizlik<',
    '>Ensures a tidy, dust-free, and relaxing environment for your rest.<': '>Tikinti və təmirdən sonra toz və çirklərin xüsusi texnika və vasitələrlə təmizlənməsi.<',

    # Process
    '>How we work<': '>Sistemimiz necə işləyir?<',
    '>Check out our working process<': '>İş prosesimizə nəzər yetirin<',
    '>Consultation<': '>Fərdi Planlama<',
    '>Reach out via our website or phone to discuss your cleaning needs &amp; receive.<': '>Qiymət obyektin ölçüsünə deyil, tələb olunan standart səviyyəsinə əsasən hesablanır.<',
    '>Custom plan<': '>Peşəkar İcra & Avadanlıq<',
    '>We create a specific cleaning plan covering all focus areas &amp; requirements.<': '>Avadanlıq, ləvazimat parkı. Peşəkar təmizlik vasitələri ilə təchizat.<',
    '>Cleaning day<': '>Keyfiyyət Nəzarəti<',
    '>Our expert team arrives on schedule to perform a thorough cleaning.<': '>Keyfiyyət yoxlama mərhələsi. Məsul menecer yoxlaması.<',
    '>Post-clean review<': '>Zəmanətli nəticə<',
    '>We ensure you’re completely satisfied with results and address any feedback.<': '>Sistemli proses və müştəriyə təhvil. Hər zaman yüksək müştəri məmnuniyyəti.<',

    # Testimonials
    '>Hear from our happy clients<': '>Bizim müştərilər və müqavilələr<',
    '>The team did an outstanding job on my home. Everything was spotless, and their attention to detail was impressive.<': '>«Türkaz «MMC ilə birgə əməkdaşlıq çərçivəsində möhtəşəm nəticələrə imza atmışıq.<',
    '>Jane Doe<': '>"YELKEN OPERATİNG COMPANY" MMC<',
    '>Jersey City, NJ<': '>Tərəfdaş<',
    '>We’ve used several cleaning services, but this one is by far the best. Reliable, efficient, and always leave our office looking pristine.<': '>Layihə ərzində yüksək peşəkarlıq və operativlik nümayiş etdirilmişdir.<',
    '>John Smith<': '>“SU İDMANI SARAYI” MMC<',
    '>New York, NY<': '>Tərəfdaş<',
    '>I was thrilled with the move-out cleaning service. My landlord was impressed, and I got my full deposit back!<': '>Otelin açılışı ərəfəsində bütün otaqlar və ictimai sahələr mükəmməl şəkildə təmizləndi.<',
    '>Emily Johnson<': '>“Yeni Abşeron Oteli” MMC<',
    '>Ridgefield, NJ<': '>Tərəfdaş<',
    '>The cleaning team was fantastic! My home has never looked this clean. Their thoroughness and eye for detail were truly impressive.<': '>Uzunmüddətli əməkdaşlığımız ərzində hər zaman yüksək xidmət standartları gördük.<',
    '>Emily Brown<': '>Boulevard Hotel Company MMC<',
    '>I was blown away by the cleaning crew&#x27;s work. Every inch of my home was pristine, and their commitment to detail was remarkable.<': '>Klinikamızda tələb olunan xüsusi sanitar-gigiyenik qaydalara tam əməl olunur.<',
    '>Mike Johnson<': '>Azpulmat MMC / MZ Plaza<',
    
    # CTA form
    '>Name<': '>Adınız<',
    '>Email<': '>Email<',
    '>Phone<': '>Telefon<',
    '>Location<': '>Ünvan<',
    '>Date<': '>Tarix<',
    '>Select service<': '>Xidmət seçin<',
}

def translate_services():
    filename = 'services.html'
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        for k, v in services_replacements.items():
            content = content.replace(k, v)

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

# Apply global updates (Fonts, Badges, Navbar Pages, Footer)
for filename in glob.glob('*.html'):
    process_html_file(filename)

# Specific Service Translation
translate_services()
