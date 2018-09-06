# disk-file-scraping
[![npm](https://img.shields.io/badge/langage-NodeJS-green.svg?style=flat-square)](https://www.python.org/) [![npm](https://img.shields.io/npm/l/date-2.svg?style=flat-square)](https://github.com/touir1/disk-file-scraping/blob/master/LICENSE)

A file scrapping application to index files in a given directory (.docx, .pdf, .xlsx).

## Dependencies ##

To install dependencies, just use `npm install`.
I used for the project:
* [fortawesome](https://fontawesome.com): Used for file icons.
* [bootstrap](https://getbootstrap.com/): Used for the responsiveness and it's beautiful components.
* [datatables](https://datatables.net/): Used for it's filters and search features.
* [directory-tree](https://github.com/mihneadb/node-directory-tree): Used to scrap the files recursively from disk.
* [jquery](https://jquery.com/): Used as a Javascript library for manipulating HTML components.
* [lodash](https://lodash.com/): Used for list manipulations.

## How to run ##
To run the project, you need to:
* Download the project or clone in.
* Install all the dependencies using `npm install`. 
* Change the parent directory to index in the _sync.js_ file.
* Start _sync.js_ to index the given parent directory using `node sync.js`.
* Start _server.js_ using `node server.js`.
* The adress of the application is: http://localhost:3132
* Enjoy.

## Authors ##

* Mohamed Ali Touir
  * Github: [https://github.com/touir1](https://github.com/touir1)
  * Email: [touir.mat@gmail.com](mailto:touir.mat@gmail.com)
  * Twitter: [@TouirMohamedAli](https://twitter.com/TouirMohamedAli)

## License ##

disk-file-scraping is published under the [MIT license](http://www.opensource.org/licenses/mit-license).
