fetch('../CSV/work-experiences.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse the CSV data
        Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                // Handle the parsed data and generate HTML
                const experiencesContainer = document.getElementById('work-experience-container');
                results.data.forEach(experience => {
                    // Split the description into sentences
                    const sentences = experience.Description.split('[newline]');

                    // Generate list items for each sentence
                    const descriptionListItems = sentences.map(sentence => {
                        return `<li>${sentence}</li>`;
                    }).join(''); // Join list items into a single string

                    const experienceCard = `
                                <center><div class="card2">
                                    <br>
                                    <table align="Center" width="80%">
                                        <tr>
                                            <td width="85%">
                                                <h2><b>${experience.JobTitle}</b></h2>
                                                <h4><b>${experience.Company}</b></h4>
                                                <h6>${experience.Duration}</h6>
                                                <ul>
                                                    ${descriptionListItems}
                                                </ul>
                                                <br>
                                            </td>
                                            <td align="right">
                                                <br>
                                                <a href="${experience.CompanyWebsiteLink}" target="_blank">
                                                    <img src="../images/experience/work/${experience.ImageURL}" alt="" width="70%">
                                                </a>
                                                <br>
                                            </td>
                                        </tr>
                                    </table>
                                    <a id="${experience.experienceID}"></a>
                                </div></center>
                                <br>`;
                    experiencesContainer.innerHTML += experienceCard;
                });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching CSV file:', error);
    });
