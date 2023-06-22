# Problem

Temps de réponse et nombre de requête

Mise en cache

https://redis.com/fr/solutions/cas-dutilisation/cache/

Accès rapide aux réponses API

La mise en cache améliore le temps de réponse de l’application en mettant en mémoire les données les plus fréquemment utilisées sur des stockages éphémères mais très rapides. Les solutions de caching en mémoire maintiennent les données dans la DRAM, plus rapide que les disques, peut s’avérer extrêmement efficace pour atteindre ces objectifs. Alors que la mise en cache est généralement utilisée pour améliorer la latence, un cache hautement disponible et résistant peut également aider à la mise à l’échelle des applications. Le transfert des responsabilités de la logique principale de l’application vers la couche de mise en cache libère des ressources permettant le traitement des demandes entrantes.

Les applications modernes sont structurées à l’aide de composants couplés de manière non restrictive et communiquant via des API. Les composants de l’application utilisent les API pour faire des requêtes pour un service provenant d’autres composants, que ce soit au sein (architecture de microservices) ou à l’extérieur (dans le cas d’utilisation de logiciel agissant en tant que service) de l’application. Le stockage de la réponse de l’API dans le cache, même s’il est de courte durée, améliore la performance de l’application en évitant ce processus de communication entre les deux composants.

Prise en main de redis
https://www.ionos.com/digitalguide/hosting/technical-matters/redis-tutorial/

Configuration du client Redis
https://docs.redis.com/latest/rs/references/client_references/client_nodejs/