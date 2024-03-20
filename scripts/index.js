// Definiendo la clase Activity
class Activity {
  constructor (id, title, description, imgURL) {
    this.id = id
    this.title = title
    this.description = description
    this.imgURL = imgURL
  }
}

// Definiendo la clase Repository
class Repository {
  constructor () {
    this.activities = JSON.parse(localStorage.getItem('activities')) || [];
    this.nextId = JSON.parse(localStorage.getItem('nextId')) || 1;
  }

  saveActivities () {
    localStorage.setItem('activities', JSON.stringify(this.activities));
  }

  getAllActivities () {
    return this.activities
  }

  createActivity (title, description, imgURL) {
    const id = this.nextId++
    const activity = new Activity(id, title, description, imgURL)
    this.activities.push(activity)
    localStorage.setItem('nextId', JSON.stringify(this.nextId));
  }

  deleteActivity (id) {
    let indexToDelete = -1
    for (let i = 0; i < this.activities.length; i++) {
      if (this.activities[i].id === parseInt(id)) {
        indexToDelete = i
        break
      }
    }
    if (indexToDelete !== -1) {
      this.activities.splice(indexToDelete, 1)
    }
    return this.activities
  }
}

module.exports = { Activity, Repository }
