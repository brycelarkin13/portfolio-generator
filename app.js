const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');
const mockData = require('./mockData')

//fs.writeFile('./index.html', pageHTML, err => {
//  if (err) throw err;

const promptUser = () => {
  return inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter you Github Username (Required)',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please enter your GitHub username!');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAbout',
    message: 'Would you like to enter some information about yourself for an "About" section?',
    default: true
  },
  {
    type: 'input',
    name: 'about',
    message: 'Provide some information about yourself:',
    when: ({ confirmAbout }) => {
      if (confirmAbout) {
       return true;
      } else {
        return false;
      }
    }
  }
]);
};

const promptProject = portfolioData => {
  console.log(`
  ==================
  Add a New Project
  ==================
  `);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the name of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a descritpion of the project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you buiold this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please provide a link to your project!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

//promptUser()
//.then(promptProject)
//.then(portfolioData => {
   //const pageHTML = generatePage(portfolioData);
   

     //fs.writeFile('./index.html', pageHTML, err => {
      // if (err) throw new Error(err);

      // console.log('Page created! Check out index.html in this directory to see it!');
    // });
  //});


  const pageHTML = generatePage(mockData);

  fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);

    console.log('Page created! Check out index.html in this directory to see it!');
  });