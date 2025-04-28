pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('my-node-app')
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    docker.image('my-node-app').run('-p 3004:3004')
                }
            }
        }
    }
}