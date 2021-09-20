# Ripio Portal

## Levantar proyecto

    docker-compose up

## Observaciones

- No se implementó paginado en frontend (se muestran primeros 10 siempre)
- Debido al límite de llamadas por segundo de Etherscan, tuve que agregar un time.sleep en una función
