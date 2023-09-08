fetch('../CSV/projects.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse the CSV data
        Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                // Handle the parsed data and generate HTML
                const projectsContainer = document.getElementById('projects-container');
                results.data.forEach(project => {
                    // Split the description into sentences
                    const sentences = project.Description.split('[newline]');

                    // Generate list items for each sentence
                    const descriptionListItems = sentences.map(sentence => {
                        return `<li>${sentence}</li>`;
                    }).join(''); // Join list items into a single string

                    const projectCard = `
                                <center><div class="card2">
                                    <br>
                                    <table align="Center" width="80%">
                                        <tr>
                                            <td width="85%">
                                                <h2><b>${project.ProjectName}</b></h2>
                                                <h4><b>${project.ProjectType}</b></h4>
                                                <ul>
                                                    ${descriptionListItems} <!-- Insert the list items here -->
                                                </ul>
                                                <p><a href="${project.CodeLink}" target="_blank"><button>${project.ButtonName}</button></a></p>
                                                ${project.SecondCodeLink ? `<p><a href="${project.SecondCodeLink}" target="_blank"><button>${project.SecondButtonName}</button></a></p>` : ''}
                                                <br>
                                            </td>
                                            <td align="right">
                                                <br>
                                                <img src="${project.ImageURL}" alt="" width="70%">
                                                <br>
                                            </td>
                                        </tr>
                                    </table>
                                    <a id="${project.ProjectID}"></a>
                                </div></center>
                                <br>`;
                    projectsContainer.innerHTML += projectCard;
                });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching CSV file:', error);
    });
