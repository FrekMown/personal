FROM ubuntu:latest
LABEL Conda Development Team <conda@continuum.io>

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV PATH /opt/conda/bin:$PATH


RUN apt-get update --fix-missing && \
    apt-get install -y wget bzip2 ca-certificates curl git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

 RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-4.5.11-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tipsy && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

RUN apt-get update
RUN apt-get -y install apache2 apache2-dev 
RUN pip install --upgrade pip
ADD ./requirements.txt /tmp
RUN conda install -c rdkit rdkit
RUN pip install -r /tmp/requirements.txt
RUN apt-get install -y libxrender-dev
ENV VERSION_APP PRODUCTION

WORKDIR /code/