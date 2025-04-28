pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3004:3004 --name my-node-app-container my-node-app'
            }
        }
    }
}
