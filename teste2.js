import {cardSearchEmpresa} from './teste.js'

const main = async () => {
    const x = await cardSearchEmpresa("Impulse")
    console.log(x)
}

main()

{
    "data": {
      "createTableRecord": null
    },
    "errors": [
      {
        "message": "Erro no campo \"E-mail\": Value deve ser único",
        "locations": [
          {
            "line": 1,
            "column": 12
          }
        ],
        "path": [
          "createTableRecord"
        ],
        "code": 30000,
        "type": "PipefyRuntimeError"
      }
    ]
  }

  {
    "data": {
      "createTableRecord": {
        "clientMutationId": null
      }
    }
  }