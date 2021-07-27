cd /home/frek/personal
git pull
git submodule update
python manage.py collectstatic
cd deployment
docker-compose restart
