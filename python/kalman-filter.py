import numpy as np

class KalmanFilter:
    def __init__(self, A, B, H, Q, R, P, x0):
        self.A = A
        self.B = B
        self.H = H
        self.Q = Q
        self.R = R
        self.P = P
        self.x = x0

    def predict(self, u=0):
        # Predict the state and covariance
        self.x = np.dot(self.A, self.x) + np.dot(self.B, u)
        self.P = np.dot(np.dot(self.A, self.P), self.A.T) + self.Q
        return self.x

    def update(self, z):
        # Compute Kalman Gain
        S = np.dot(self.H, np.dot(self.P, self.H.T)) + self.R
        K = np.dot(np.dot(self.P, self.H.T), np.linalg.inv(S))

        # Update the estimate via measurement
        y = z - np.dot(self.H, self.x)
        self.x += np.dot(K, y)

        # Update the error covariance
        I = np.eye(self.H.shape[1])
        self.P = np.dot(I - np.dot(K, self.H), self.P)

        return self.x

# Example parameters for a 1D case
A = np.array([[1]])  # State transition matrix
B = np.array([[0]])  # Control input matrix
H = np.array([[1]])  # Measurement matrix
Q = np.array([[1]])  # Process noise covariance
R = np.array([[10]]) # Measurement noise covariance
P = np.array([[1]])  # Initial covariance
x0 = np.array([[0]]) # Initial state

kf = KalmanFilter(A, B, H, Q, R, P, x0)

# Example usage
measurements = [1, 2, 3]  # Example measurements
predictions = []

for z in measurements:
    kf.predict()
    prediction = kf.update(z)
    predictions.append(prediction[0][0])

print("Predictions:", predictions)
