pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t chatgptlogger .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker stop chatgpt-logger || true'
                sh 'docker run -d --name chatgpt-logger chatgptlogger'
            }
        }
    }
}
