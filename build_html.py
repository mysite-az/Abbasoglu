import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# find header
nav_end = html.find('</div>\n    </div>\n    <section class="hero-section"') 
if nav_end == -1:
    nav_end = html.find('</div>\n        </div>\n    </div>\n    <section')
if nav_end == -1:
    nav_end = html.find('</nav>\n') + 500

header = html[:nav_end]
header = header[:header.rfind('</div>')+6]

# find footer
footer_start = html.find('<div class="footer7_component">')
if footer_start == -1:
    footer_start = html.find('<footer')
if footer_start == -1:
    footer_start = html.find('<section class="footer')

footer = html[footer_start:]

import os
with open("react-app/src/pages/About.jsx", "r", encoding="utf-8") as f:
    about_jsx = f.read()

with open("react-app/src/pages/Services.jsx", "r", encoding="utf-8") as f:
    services_jsx = f.read()

def jsx_to_html(jsx):
    # remove import
    lines = jsx.split('\n')
    lines = [l for l in lines if not l.startswith('import ') and not l.startswith('function ') and not l.startswith('export ') and not l.strip() == 'return (' and not l.strip() == '<>' and not l.strip() == '</>' and not l.strip() == ');' and not l.strip() == '}']
    html_body = '\n'.join(lines)
    # replace className with class
    html_body = html_body.replace('className=', 'class=')
    return html_body

about_html_body = jsx_to_html(about_jsx)
services_html_body = jsx_to_html(services_jsx)

with open("about.html", "w", encoding="utf-8") as f:
    f.write(header + "\n" + about_html_body + "\n" + footer)

with open("services.html", "w", encoding="utf-8") as f:
    f.write(header + "\n" + services_html_body + "\n" + footer)

