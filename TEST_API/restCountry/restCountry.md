# Rest Country

## Base URL

`https://restcountries.com/v3.1/`

## Service / Value / Exemple

### liste des services

| Service | Value  | Exemple |
|---------|--------|---------|
| all     |        | Tous les pays |
| lang    | french | La langue en anglais |
| region  | europe | La région en anglais |
| subregion | Northern Europe | La sous-région en anglais |
| alpha   | FRA    | Le code ISO du pays |

### liste des values

Pour obtenir la liste des valeurs suffit d'exectuer une requête

`https://restcountries.com/v3.1/all?fields=languages`
`https://restcountries.com/v3.1/all?fields=region`
`https://restcountries.com/v3.1/all?fields=subregion`

## Filtre

- `fields` => `{{baseUrl}}/{{service}}/{{value}}?fields={{fields}}`

Exemple de `request.param` :

```javascript
const param = {
  "service" : "alpha",
  "value" : "FRA",
  "fields" : [
    "name",
    "currencies",
    "capital",
    "subregion",
    "region",
    "languages",
    "flags",
    "coatOfArms",
    "area",
    "maps",
    "population",
    "car",
    "timezone",
    "continent",
  ]
};
```

retourne 
```javascript
{
  "flags": {
    "png": "https://flagcdn.com/w320/fr.png",
    "svg": "https://flagcdn.com/fr.svg",
    "alt": "The flag of France is composed of three equal vertical bands of blue, white and red."
  },
  "coatOfArms": {
    "png": "https://mainfacts.com/media/images/coats_of_arms/fr.png",
    "svg": "https://mainfacts.com/media/images/coats_of_arms/fr.svg"
  },
  "name": {
    "common": "France",
    "official": "French Republic",
    "nativeName": { "fra": [Object] }
  },
  "capital": [ "Paris" ],
  "region": "Europe",
  "subregion": "Western Europe",
  "languages": { "fra": "French" },
  "area": 551695,
  "maps": {
    "googleMaps": "https://goo.gl/maps/g7QxxSFsWyTPKuzd7",
    "openStreetMaps": "https://www.openstreetmap.org/relation/1403916"
  }
}
```