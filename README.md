# Markdown convert

Markdown converter is a javascript based backend API web service to convert Markdown files into PDF format using Node.js and Express.js .

### Installation
Clone or donwload 
```
git clone https://github.com/khouloudS/convertMarkdownToPDF-backend-api
```

Install the dependencies needed convertMarkdownToPDF-backend-api
```
cd convertMarkdownToPDF-backend-api
npm install
```

### Usage
Markdown converter comes with three web services:
1. Run the web server
```
npm start
```
2. Uploading a markdown file
> ```
> POST file/upload
> ```
Parameters

| Name        | Description |
| ----------- | ----------- |
| file        |Input file   |

Responses

| Code        | Description |
| ----------- | ----------- |
| 200         |Uploaded     |
| ----------- | ----------- |
| 400         |Bad request  |
| ----------- | ----------- |
| 500         |Bad format   |


3. Convert the uploaded file to pdf format:
> ```
> GET file/convert/<file_id.md>
> ```
Parameters

| Name        | Description |
| ----------- | ----------- |
| file_id     |File ID      |

Responses

| Code        | Description  |
| ----------- | ------------ |
| 200         |Converted     |
| ----------- | ------------ |
| 404         |Not found     |
| ----------- | ------------ |
| 500         |Internal Error|

Example:
```
GET file/convert/96286ba313a38e0c012961b8ec747a01.md
```

4. Download a converted PDF file:
> ```
> GET file/download/<file_id.pdf>
> ```
Parameters

| Name        | Description |
| ----------- | ----------- |
| file_id     |File ID      |

Responses

| Code        | Description  |
| ----------- | ------------ |
| 200         |Downloaded    |
| ----------- | ------------ |
| 404         |Not found     |
| ----------- | ------------ |
| 500         |Internal Error|

Example:
```
GET file/download/96286ba313a38e0c012961b8ec747a01.pdf
```

### Author
Khouloud Sellami (khouloud.sellami@esprit.tn)
