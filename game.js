var viz;
        function draw() {
           
            var config = {
                container_id: "viz",
                server_url: "bolt://52.91.116.38:38423",
                server_user: "neo4j",
                server_password: "standardizations-seasons-training",
                labels: {
                    "Character": {
                        "caption": "name",
                        "size": "pagerank",
                        "community": "community",
                        //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
                    }
                },
                relationships: {
                    "INTERACTS": {
                        "thickness": "weight",
                        "caption": true,
                    
                    }
                },
                
                 //initial_cypher: "MATCH (Robb:Character {name: 'Robb-Stark'})-[:INTERACTS]->(m)<-[r:INTERACTS]-(Character), (Character)-[p:INTERACTS]->(m2)<-[:INTERACTS]-(coCharacter) WHERE NOT (Robb)-[:INTERACTS]->()<-[:INTERACTS]-(coCharacter) AND Robb <> coCharacter return coCharacter.name AS Recommended, coCharacter, count(*) AS Strength ORDER BY Strength DESC LIMIT 20"
                initial_cypher: "WITH ['Robb-Stark', 'Daenerys-Targaryen', 'Cersei-Lannister', 'Jaime-Lannister', 'Eddard-Stark'] as names MATCH (p:Character)-[r:INTERACTS]->(m) WHERE p.name in names RETURN r,m,p"
            };
            viz = new NeoVis.default(config);
            viz.render();
            console.log(viz);
           
        }

        // Statically define our characters
        var characters = ['Robb-Stark', 'Daenerys-Targaryen', 'Cersei-Lannister', 'Jaime-Lannister', 'Eddard-Stark'];

        function toggleCharacter(character) {
            // We know the checkbox is checked if the character already exists in the array. If so, remove the character
            if(characters.includes(character)) characters = removeCharacter(character);
            // The character was not in the array, meaning the checkbox is unchecked, so add the character back in
            else characters.push(character);
            // The query subsituting in our 'characters' array 
            const query = "WITH " + JSON.stringify(characters) + " as names MATCH (p:Character)-[r:INTERACTS]->(m) WHERE p.name in names RETURN r,m,p"
            viz.renderWithCypher(query)
        }
        
        // Function will return a new array that exludes the character passed in
        function removeCharacter(character) {
            return characters.filter(function(value, index, arr){
                return value != character;
            });
        }
