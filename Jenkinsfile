pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'devops:task7-3'
        SONARQUBE_SERVER = 'SonarCloud'
        DOCKER_HUB_USERNAME = 'jtambeana'  
        DOCKER_HUB_REPO = 'sit753-task7.3'        
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials' 
    }

    stages {
        stage('Checkout') {
            steps {// Checkout the code from GitHub
                git branch: 'main', url: 'https://github.com/225221834/DevOps7.3.git'
            }
        }
        // Build the Docker image
        stage('Build Docker Image') {
            steps {
                script {// Build the Docker image
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        // Run tests using the built Docker image
        stage('Run Tests with Appium') {
            steps {// Run tests using the built Docker image
                echo "Running Appium tests inside Docker image..."
                sh '''
                    docker run --rm \
                        --name test-runner \
                        ${DOCKER_IMAGE} /bin/sh -c '
                            echo "Starting Appium server..."
                            appium --log-level error &

                            APPIUM_PID=$!
                            echo "Starting Web Server..."
                            node services/server.js &

                            SERVER_PID=$!

                            echo "Waiting for web server on port 3000..."
                            for i in $(seq 1 10); do
                                curl -s http://localhost:3000 > /dev/null && break
                                echo "Still waiting..."
                                sleep 2
                            done

                            echo "Running Mocha tests..."
                            mocha tests/

                            echo "Stopping Appium server..."
                            kill $APPIUM_PID || true

                            echo "Stopping Web Server..."
                            kill $SERVER_PID || true
                        '
                '''
            }
        }
        // Perform SonarQube code quality analysis
        stage('SonarQube Code Quality Analysis') {
            steps {// Perform SonarQube code quality analysis
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    sh '''
                        docker run --rm \
                            -v "${WORKSPACE}:/usr/src" \
                            -w /usr/src \
                            -e SONAR_HOST_URL=$SONAR_HOST_URL \
                            -e SONAR_TOKEN=$SONAR_AUTH_TOKEN \
                            sonarsource/sonar-scanner-cli \
                            -Dsonar.projectKey=225221834_DevOps7.3 \
                            -Dsonar.organization=225221834 \
                            -Dsonar.sources=.
                    '''
                }
            }
        }
        // Security scan using Trivy
        stage('Security Scan with Trivy') {
            steps {
                script {// Security scan using Trivy
                    def status = sh (
                        script: "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL ${DOCKER_IMAGE}",
                        returnStatus: true
                    )// Capture the exit status of the Trivy scan
                    if (status == 1) {
                        echo "Trivy found HIGH or CRITICAL vulnerabilities, but continuing without marking the build unstable."
                    } else if (status != 0) {// If Trivy fails for other reasons, fail the build
                        error("Trivy scan failed with exit code ${status}")
                    } else {
                        echo "Trivy scan passed with no HIGH or CRITICAL vulnerabilities."
                    }
                }
            }
        }
        // Security scan using Snyk
        stage('Security Scan with Snyk') {
            steps {// Security scan using Snyk
                withCredentials([string(credentialsId: 'snyk-api-token', variable: 'SNYK_TOKEN')]) {
                    sh '''
                        echo "Running Snyk scan using Docker image..."
                        docker run --rm --platform linux/amd64 -e SNYK_TOKEN=$SNYK_TOKEN snyk/snyk:docker test --all-projects
                    '''
                }
            }
        }
        // Deploy the Docker image to Docker Hub
        stage('Deploy to Docker Hub') {
            steps {
                script {
                    // Docker Hub login credentials
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "Logging into Docker Hub..."
                            echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin

                            # Tagging the image
                            docker tag ${DOCKER_IMAGE} ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPO}:latest

                            # Pushing the image to Docker Hub
                            docker push ${DOCKER_HUB_USERNAME}/${DOCKER_HUB_REPO}:latest
                        '''
                    }
                }
            }
        }
    }
    // Post actions to always run after the pipeline
    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
