# Chemocobra: Chemoinformatics & Metabolic Modelling

To install:

1. Install conda 
2. conda env create -f deployment/chemocobra-env.yml chemocobra-env

To run:
1. conda activate chemocobra-env
2. python manage.py runserver
3. go to http://localhost:8000/

If you changed the `static` folder:
1. Be sure everything is on `main/static`
2. python manage.py collectstatic
3. yes
4. files will be copied to `static` folder, which is not commited to git

To make any modification:
1. Work on `main/templates/main/index-dev.html` and `main/static/main/css/master.css`
2. You can access it at http://localhost:8000/index-dev
3. Before deploying run `python create_version.py`, which creates a css version and a `index.html` with the new css version included