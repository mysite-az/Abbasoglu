import re
import os
import glob

def do_translation(filename, replacements):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    for k, v in replacements.items():
        content = content.replace(k, v)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

common_replacements = {
    # Nav
    '>Home<': '>Ana Səhifə<',
    '>Services<': '>Xidmətlər<',
    '>About<': '>Haqqımızda<',
    '>Contact us<': '>Əlaqə<',

    '>Home 2<': '>Ana Səhifə 2<',
    '>Service Static<': '>Statik Xidmət<',
    '>Pricing<': '>Qiymətlər<',
    '>Contact<': '>Əlaqə<',
    '>Privacy Policy<': '>Məxfilik Siyasəti<',
    
    # Footer
    '>Premium xidmət sifariş etmək üçün əlaqə saxlayın.<': '>Premium xidmət sifariş etmək üçün elə indi bizimlə əlaqə saxlayın.<',
    '>Claim your free first Cleaning today.<': '>Premium xidmət sifariş etmək üçün elə indi bizimlə əlaqə saxlayın.<',
    '>We handle repairs &amp; maintenance for all appliances with expertise &amp; efficiency to ensure your appliances.<': '>Uzunmüddətli tərəfdaşlıq üçün sistemli, peşəkar və yüksək standartlara uyğun təmizlik.<',
    '>Call us: +1-394-495-5993<': '>Zəng edin: +994 50 000 00 00<',
    '>Claim free visit<': '>Təklif Alın<',
}

index_replacements = {
    # Hero
    '>Quality cleaning service<': '>Yüksək Standartlı Təmizlik Həlləri<',
    '>Experience top-notch cleaning services that cater to both residential and commercial needs team of skilled professionals trusts us to deliver consistent, high-quality results every time.<': '>Keyfiyyət təsadüfi olmur. O, planın və nəzarətin nəticəsidir. Peşəkar yanaşma. Sistemli proses. Zəmanətli nəticə.<',
    '>Request a service<': '>Fərdi Təklif Al<',
    'placeholder="Dennis barrett"': 'placeholder="Adınız və Soyadınız"',
    'placeholder="example@gmail.com"': 'placeholder="nümunə@gmail.com"',
    '>Select service<': '>Xidməti seçin<',
    '>Location<': '>Ünvan<',
    'placeholder="Los angeles"': 'placeholder="Bakı"',
    'value="Submit"': 'value="Göndər"',
    '>First<': '>Fasad və Şüşə<',
    '>Second<': '>Təmir sonrası<',
    '>Third<': '>Mənzil və Villa<',

    # About
    '>We are a dedicated cleaning company providing top-quality services to our clients<': '>Abbasoğlu təmizlik xidməti: «ABBASOĞLU» təmizlik xidməti 2012-ci ildən təmizlik bazarında fəaliyyət göstərir.<',
    '>Our company is committed to delivering top-quality services to our clients and we are an experienced team specializing in both residential and commercial cleaning.<': '>Şirkətin əsas fəaliyyət sahəsi peşəkar təmizlik xidmətlərinin göstərilməsidir. Biz strukturlaşdırılmış xidmət modeli tətbiq edirik.<',
    '>Projects completed<': '>Tamamlanmış layihə<',
    '>Over 300+ successful projects delivered with precision and care.<': '>İllərin təcrübəsi və hər zaman yüksək müştəri məmnuniyyəti.<',
    '>300<': '>1000<',
    '>Professional cleaners<': '>İl təcrübə<',
    '>Dedicated to delivering spotless results every time.<': '>Təmizlik xidməti sahəsində peşəkar fəaliyyət göstərdiyimiz illər.<',
    '>50<': '>13<',
    '>Client retention rate<': '>Məmnun müştəri<',
    '>Client retention, reflecting quality and satisfaction.<': '>Yüzlərlə məmnun müştəri və daimi tərəfdaşlıqlar.<',
    '>98<': '>100<',

    # Services
    '>Our services<': '>Xidmətlərimiz<',
    '>View all services<': '>Bütün xidmətlər<',
    '>Office cleaning<': '>Ofis və Biznes mərkəzi<',
    '>Designed to maintain a pristine &amp; productive workspace, tailored to your business needs.<': '>Sabit və yüksək səviyyəli xidmət. Müqaviləli xidmət və keyfiyyət hesabatı.<',
    '>Window cleaning<': '>Fasad və Şüşə<',
    '>Crystal-clear window cleaning services that brighten your view of your property.<': '>Binaların fasad və şüşələrinin peşəkar yuyulması. Sənaye alpinistləri.<',
    '>Carpet cleaning<': '>İctimai yerlərin təmizliyi<',
    '>Removes dirt, stains, and allergens, leaving your carpets fresh and revitalized.<': '>İctimai yerlərin gündəlik, əsaslı, təmir sonrası təmizliyi. Kovrolit və mərmər səthlərin yuyulması.<',
    '>Bedroom cleaning<': '>Təmir Sonrası Təmizlik<',
    '>Ensures a tidy, dust-free, and relaxing environment for your rest.<': '>Tikinti və təmirdən sonra toz və çirklərin xüsusi texnika və vasitələrlə təmizlənməsi.<',

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

    # Pricing -> Process
    '>Our pricing<': '>Sistemimiz necə işləyir?<',
    '>Basic cleaning package<': '>Fərdi Planlama<',
    '>Ideal for regular maintenance of your home or office.<': '>Qiymət obyektin ölçüsünə deyil, tələb olunan standart səviyyəsinə əsasən hesablanır.<',
    '>Includes:<': '>Proses:<',
    '>Dusting<': '>Obyekt analizi<',
    '>Vacuuming<': '>Fərdi planın hazırlanması<',
    '>Sweeping and mopping<': '>Zamanın planlanması<',
    '>Surface cleaning<': '>Büdcə təsdiqi<',
    '>Get started<': '>Təklif al<',
    
    '>Standard cleaning package<': '>Peşəkar İcra & Avadanlıq<',
    '>Includes all services in the Basic package plus additional services.<': '>Avadanlıq, ləvazimat parkı. Peşəkar təmizlik vasitələri ilə təchizat.<',
    '>Everything in basic cleaning<': '>«Ecober», «Faber», "Grass"<',
    '>Bathroom scrubbing<': '>«Alman texnikası evi», «Karcher»<',
    '>Kitchen appliance cleaning<': '>Təlimli və daimi komanda<',
    '>Baseboard and trim cleaning<': '>Sertifikatlı işçilər<',

    '>Deep cleaning package<': '>Keyfiyyət Nəzarəti<',
    '>Perfect for seasonal cleaning or move-ins/outs.<': '>Keyfiyyət təsadüfi olmur. O, planın və nəzarətin nəticəsidir.<',
    '>Everything in standard cleaning<': '>Keyfiyyət yoxlama mərhələsi<',
    '>Carpet cleaning<': '>Məsul menecer yoxlaması<',
    '>Window washing<': '>Müştəriyə təhvil<',
    '>High dusting (e.g., ceiling fans)<': '>Zəmanətli nəticə<',

    # Blog -> Advantages
    '>Our blog<': '>Üstünlüklərimiz<',
    '>View all blogs<': '>Ətraflı<',
    '>The science behind effective kitchen sanitization<': '>Strukturlaşdırılmış iş planı və sistemli yanaşma<',
    '>A beginner’s guide to upholstery maintenance<': '>Təlimli və daimi komanda, səlis xidmət<',
    '>The importance of regular office cleaning<': '>Müasir avadanlıq və keyfiyyətə nəzarət mərhələsi<',
    '>Kitchen Cleaning<': '>Sistem mərhələsi<',
    '>Upholstery Cleaning<': '>İşçi mütəxəssislər<',
    '>Office Cleaning<': '>Avadanlıqlar<',
    '>December 10, 2024<': '>Zəmanətli Nəticə<',
}


about_replacements = {
    # About Hero
    '>Excellence in every clean<': '>Hər təmizlikdə mükəmməllik<',
    '>At our company, we believe that every clean matters. Our commitment to excellence is reflected in our meticulous attention to detail and the high standards we uphold in every service we provide. From residential spaces to commercial properties.<': '>«ABBASOĞLU» təmizlik xidməti 2012-ci ildən təmizlik bazarında fəaliyyət göstərir. Şirkətin əsas fəaliyyət sahəsi peşəkar təmizlik xidmətlərinin göstərilməsidir. Biz adi təmizlik xidməti təqdim etmirik. Biz strukturlaşdırılmış xidmət modeli tətbiq edirik.<',
    
    # Values
    '>Our mission<': '>Bizim Missiyamız<',
    '>Clearly state your commitment to providing top-notch cleaning services that prioritize customer satisfaction, safety, and environmental sustainability.<': '>Keyfiyyət təsadüfi olmur. O, planın və nəzarətin nəticəsidir. Bütün məhsulların keyfiyyət sertifikatları var.<',
    '>Our story<': '>Bizim hekayəmiz<',
    '>Our story began with a simple yet powerful idea: to create a cleaning service that genuinely cares about its clients and the environment.<': '>Abbasoğlu təmizlik xidməti bazarda öz peşəkar yanaşması, sistemli proseslərlə və zəmanətli nəticələri ilə seçilir.<',
    '>Our vision<': '>Baxış bucağımız<',
    '>Our vision is to be recognized as the leading cleaning service provider in our region, known for our unwavering commitment to quality and customer care.<': '>Hər obyekt üçün fərdi plan hazırlanır və keyfiyyətə nəzarət mərhələsi mövcuddur. Qiymət obyektin ölçüsünə deyil, tələb olunan standart səviyyəsinə əsasən hesablanır.<',

    # Core Message / Split About
    '>Your satisfaction is our priority<': '>Müştəri məmnuniyyəti bizim prioritetimizdir<',
    '>We prioritize open communication and responsiveness to your needs. We value your feedback and continuously strive to improve our services, ensuring that you receive the highest level of care and attention.<': '>Keyfiyyətsiz iş, nəzarətsiz komanda, zaman itkisi kimi problemləri həll edirik. Biz struktur təqdim edirik: obyekt analizi, fərdi plan, peşəkar icra, keyfiyyət yoxlaması.<',
    
    # Checkmarks
    '>Exceptional quality<': '>Yüksək standart<',
    '>Customer satisfaction<': '>Sistemli yanaşma<',
    '>Eco-friendly practices<': '>Strukturlaşdırılmış proses<',
    '>Customized solutions<': '>Fərdi həll<',
    '>Reliable and trustworthy<': '>Təlimli və daimi komanda<',
    '>Affordable pricing<': '>Müasir avadanlıq<',
    '>Positive reviews<': '>Keyfiyyət yoxlama mərhələsi<',
    '>View all services<': '>Bütün xidmətlər<',

    # Counters
    '>Projects completed<': '>Tamamlanmış layihə<',
    '>Professional cleaners<': '>İl təcrübə<',
    '>Client retention rate<': '>Məmnun müştəri<',
    '>Award winning<': '>Tərəfdaşlar<',
    '>300<': '>1000<',
    '>50<': '>13<',
    '>98<': '>100<',

    # Valued Services
    '>Our most valued services<': '>Ən Çox Tələb Olunan Xidmətlərimiz<',
    '>Office cleaning<': '>Ofis və Biznes mərkəzi<',
    '>Designed to maintain a pristine &amp; productive workspace, tailored to your business needs.<': '>Biznes mərkəzləri, klinikalar və obyektlər üçün sabit və yüksək səviyyəli xidmət.<',
    '>Window cleaning<': '>Fasad və Şüşə<',
    '>Crystal-clear window cleaning services that brighten your view of your property.<': '>Binaların fasad və şüşələrinin sənaye alpinistləri tərəfindən mükəmməl yuyulması.<',
    '>Carpet cleaning<': '>Təmir Sonrası Dərin Təmizlik<',
    '>Removes dirt, stains, and allergens, leaving your carpets fresh and revitalized.<': '>Tikinti və təmir prosesindən sonra yaranan toz, sement izi və çirklər xüsusi texnika və peşəkar vasitələrlə aradan qaldırılır.<',

    # Team section
    '>Our team<': '>Bizim Komandamız<',
    '>Judy Nguyen<': '>Sənaye Alpinistləri<',
    '>Kitchen Cleaning Expert<': '>Sertifikatlı mütəxəssislər<',
    '>Emily Brown<': '>Keyfiyyət Nəzarətçisi<',
    '>Window Cleaning Technician<': '>Məsul menecer<',
    '>John Doe<': '>Təmizlik Mütəxəssisi<',
    '>Office Cleaning Specialist<': '>Təlimli daimi işçi<',
    '>Jane Smith<': '>Komanda Rəhbəri<',
    '>Lead Cleaner<': '>Proses idarəçisi<',
    '>Mike Johnson<': '>Avadanlıq Rəhbəri<',
    '>Carpet &amp; Upholstery Specialist<': '>Təchizatlar üzrə ekspert<',
}

def translate_all_files():
    # First, translate all files with common translations
    for filename in glob.glob('**/*.html', recursive=True):
        do_translation(filename, common_replacements)

    # Translate specific files
    if os.path.exists('index.html'):
        do_translation('index.html', index_replacements)
    if os.path.exists('about.html'):
        do_translation('about.html', about_replacements)

translate_all_files()

form_replacements = {
    '>Name<': '>Adınız<',
    '>Email<': '>Email<',
    '>Phone<': '>Telefon<',
    '>Location<': '>Ünvan<',
    '>Date<': '>Tarix<',
    '>Select service<': '>Xidmət seçin<',
}

do_translation('index.html', form_replacements)

do_translation('about.html', form_replacements)
do_translation('services.html', form_replacements)
do_translation('contact.html', form_replacements)

