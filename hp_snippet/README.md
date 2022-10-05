# Comments about code snippet

- Superagent should be installed and imported to the file to prevent an error.
- Shop and User mongoose models should be defined and imported to the file to prevent an error.

# Comments about refactor

Following the SOLID principles the code should be divided in small parts/methods to make it more readable and easy to change.
As you see I have divided the code in multiple parts, one for the code involved finding and updating the user on the database, the second, the code involved in finding a show by id, the third, involved on setting the response status and error message in case the user has been already invited to the shop and the fourth, which is the main block.
