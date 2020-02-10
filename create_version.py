import os
import re

BASE_DIR = os.getcwd()
CSS_DIR = os.path.join(BASE_DIR, 'main', 'static', 'main', 'css')
JS_DIR = os.path.join(BASE_DIR, 'main', 'static', 'main', 'js')
HTML_DIR = os.path.join(BASE_DIR, 'main', 'templates', 'main')

CSS_FILES = [
   "master.css"
]

HTML_FILES = [
    "index.html"
]

for cssfile in CSS_FILES:
    app_name = HTML_DIR.split('/')[-1]
    # get latest version
    pattern_version = r'{}~v([0-9]+)'.format(cssfile.split('.')[0])
    # Get the latest version of file
    versions = [int(re.findall(pattern_version, f)[0]) for f in os.listdir(os.path.join(CSS_DIR)) if re.match(pattern_version, f) is not None]
    new_version = max(versions)+1    
    new_filename = '{}~v{}.css'.format(cssfile.split('.')[0], new_version)
    os.system("cp {} {}".format(os.path.join(CSS_DIR, cssfile), os.path.join(CSS_DIR, new_filename)))
    new_filedir_html = os.path.join('/static', app_name, "css", new_filename)
    print("*** File created: {}".format(new_filedir_html))

    # Change name in HTML files
    for htmlfile in HTML_FILES:
        htmlfile_dev = '{}-dev.html'.format(htmlfile.split('.')[0])
        patt_css_name = r'/[\S]+/{}'.format(cssfile)
        # write new file
        with open(os.path.join(HTML_DIR, htmlfile_dev)) as f:            
            new_file = re.sub(patt_css_name, new_filedir_html, f.read())
        with open(os.path.join(HTML_DIR, htmlfile), 'w') as f:
            f.write(new_file)
        print("*** File modified: {}".format(htmlfile))
