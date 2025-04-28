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
                        docker rm -f chatgpt-logger || true
                sh 'docker run -d -p 3004:3004 --name chatgpt-logger chatgptlogger'
            }
        }
    }
}
