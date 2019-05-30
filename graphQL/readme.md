 Graph QL is just a specification on top of HTTP describing how resources should be shared and requested.

 You make "queries" to a single endpoint defing teh exact data that you want to make use of and teh server responds to you with that information. No over-fetching or under-fetching of data.

Because your dat is modelled in graphs, you can make queries of complex relationships of data that would otherwise needed you to make multiple trips with REST APIs

Changes to data (creating, updating and deleting) are made through "mutations"

GraphQL also has the concept of "subscriptions" which maintains a connection between the client and the server (streaming of data)