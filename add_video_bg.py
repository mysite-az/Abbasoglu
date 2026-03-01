import re
import glob

video_html = """<div class="video-background" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden;">
    <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
        <source src="https://cdn.prod.website-files.com/6710f912b08f2b5f7beec811%2F67137b863467616e3790e77f_bg-video-transcode.mp4" type="video/mp4" />
        <source src="https://cdn.prod.website-files.com/6710f912b08f2b5f7beec811%2F67137b863467616e3790e77f_bg-video-transcode.webm" type="video/webm" />
    </video>
</div>"""

def add_video_bg(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # We target section tags with class containing hero-section
    # specifically "<section class="hero-section">"
    # or "<section class="about-hero-section">"
    # or "<section class="service-hero-section">"
    
    # We will replace these specific tags
    hero_classes = ['hero-section', 'about-hero-section', 'service-hero-section']
    
    for hc in hero_classes:
        target_tag = f'<section class="{hc}">'
        replacement = f'<section class="{hc}" style="position: relative; overflow: hidden; background-image: none !important; background-color: #000;">{video_html}'
        
        if target_tag in content:
            content = content.replace(target_tag, replacement)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in glob.glob('*.html'):
    add_video_bg(filename)
