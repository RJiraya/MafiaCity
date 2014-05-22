# [![MEAN Logo](http://www.mean.io/img/logos/meanlogo.png)](http://mean.io/) Mafia City


## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://docs.mongodb.org/manual/installation/) - Make sure `mongod` is running on the default port (27017). Tout est expliqué dans l'installation.

### Tools Prerequisites
* NPM - Node.js package manage; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:

```
$ npm install -g bower
```

* Grunt - Download and Install [Grunt](http://gruntjs.com). 

```
$ npm install -g grunt-cli
```

* Mean.io

```
$ npm install -g meanio
```


## Quick Install
  Récupérer les sources sur le gitHub RJiraya/MafiaCity/trunk. Utiliser svn checkout avec l'url 'RJiraya/MafiaCity/trunk'
  Une fois dans le dossier, éxécutez : 
  
  ```
  $ npm install
  ```
  
  Puis pour lancer le serveur
  
  ```
  $ grunt
  ```

  Assurez vous d'avoir lancé MangoDB
  
## Mettre à jour son projet & valider ses modifications

  * Update
  
  Mets à jour son code, par rapport au version des autres membres

  * Commit 
  
  Valide les modifications de son code. ATTENTION ne pas commit les librairies! 
  Ne pas commit : .project, .bower_tmp, .bower_registry, .bower_cache, node_modules, public/system/lib!
  
## License
[The MIT License](http://opensource.org/licenses/MIT)
