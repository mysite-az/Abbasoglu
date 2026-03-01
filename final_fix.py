import glob
import os

services_replacements = {
    '>We pride ourselves on delivering top-tier cleaning services designed to meet your unique needs. Our team of skilled professionals utilizes cutting-edge techniques.<': '>Biz sizin unikal ehtiyaclarınıza uyğunlaşdırılmış ən yüksək səviyyəli təmizlik xidmətləri təqdim etməkdən qürur duyuruq.<',
    # Some other areas that might have been missed or slightly different
    '>Expert cleaning solutions<': '>Ekspert təmizlik həlləri<',
    '>Basic cleaning package<': '>Fərdi Planlama<',
    '>What services do you offer?<': '>Hansı xidmətləri təklif edirsiniz?<',
    '>We offer a comprehensive range of cleaning services, including residential cleaning, commercial janitorial services, carpet cleaning, window washing, and deep cleaning. Our services are tailored to meet the unique needs of each client.<': '>Biz yaşayış sahələrinin təmizliyi, ticarət və ofis mərkəzləri, xalça yuyulması, pəncərə təmizliyi və dərindən təmizlik daxil olmaqla geniş bir təmizlik xidmətləri spektrini təklif edirik.<',
    '>How do I book a cleaning service?<': '>Təmizlik xidmətini necə sifariş etməliyəm?<',
    '>Booking a service is easy! You can schedule an appointment online through our website, give us a call, or send us an email. Our customer service team is ready to assist you with your booking.<': '>Xidmət sifariş etmək çox asandır! Sizin üçün uyğun vaxtı onlayn şəkildə veb saytımızdan, zəng edərək və ya e-poçt vasitəsilə planlaşdıra bilərsiniz.<',
    '>What is your cancellation policy?<': '>Ləğv siyasətiniz nədən ibarətdir?<',
    '>We understand that plans can change. If you need to cancel or reschedule your appointment, please contact us at least 24 hours in advance. Cancellations made less than 24 hours before the scheduled service may incur a fee.<': '>Planların dəyişə biləcəyini anlayırıq. Əgər görüşünüzü ləğv etməli və ya vaxtını dəyişməli olarsınızsa, xahiş edirik ki, ən azı 24 saat əvvəldən bizimlə əlaqə saxlayasınız.<',
    '>Can I request the same cleaning team for each visit?<': '>Hər ziyarət üçün eyni təmizlik komandasını istəyə bilərəmmi?<',
    '>We strive to provide consistency for our clients. If you prefer the same cleaning team for each visit, please let us know, and we will do our best to accommodate your request.<': '>Müştərilərimiz üçün davamlılığı təmin etməyə çalışırıq. Əgər hər təmizlikdə eyni təlimli komandanın olmasını üstün tutursunuzsa, lütfən bildirin.<',
    '>Do I need to be home during the cleaning?<': '>Təmizlik zamanı evdə (obyektdə) olmağım mütləqdirmi?<',
    '>It’s up to you! You can choose to be present during the cleaning, or you can provide us with access to your home or office. Our trusted staff will ensure your property is secure and well-cared for.<': '>Bu sizdən asılıdır! Siz təmizlik zamanı obyektdə ola da bilərsiniz, ya da təhlükəsizlik və etibarlılıqla prosesi bizə həvalə edə bilərsiniz.<',
    '>Delivering superior cleaning services with unwavering dedication<': '>Sarsılmaz fədakarlıq və ən yüksək standart keyfiyyətlə təmizlik xidmətləri göstəririk<',
    '>Our pricing<': '>Sistemimiz necə işləyir?<',
    '>Read more<': '>Ətraflı oxu<'
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

# Add webflow badge hider CSS to ALL HTML files
def hide_webflow_badge():
    css_hider = '<style>.w-webflow-badge { display: none !important; }</style>'
    for filename in glob.glob('*.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        if css_hider not in content:
            content = content.replace('</head>', f'{css_hider}\n</head>')
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

translate_services()
hide_webflow_badge()
