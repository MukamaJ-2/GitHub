from cryptography.fernet import Fernet
import json

# Generate a key for encryption (save this key securely!)
def generate_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)
    return key

# Load the encryption key
def load_key():
    return open("secret.key", "rb").read()

# Encrypt a password
def encrypt_password(password, key):
    f = Fernet(key)
    encrypted_password = f.encrypt(password.encode())
    return encrypted_password

# Decrypt a password
def decrypt_password(encrypted_password, key):
    f = Fernet(key)
    decrypted_password = f.decrypt(encrypted_password).decode()
    return decrypted_password

# Store Wi-Fi credentials in a file
def store_wifi_credentials(ssid, password, key):
    encrypted_password = encrypt_password(password, key)
    wifi_data = {ssid: encrypted_password.decode()}

    try:
        with open("wifi_passwords.json", "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {}

    data.update(wifi_data)

    with open("wifi_passwords.json", "w") as file:
        json.dump(data, file, indent=4)

# Retrieve Wi-Fi credentials from the file
def retrieve_wifi_credentials(ssid, key):
    try:
        with open("wifi_passwords.json", "r") as file:
            data = json.load(file)
            encrypted_password = data.get(ssid)
            if encrypted_password:
                return decrypt_password(encrypted_password.encode(), key)
            else:
                return "SSID not found."
    except FileNotFoundError:
        return "No Wi-Fi credentials stored yet."

# Example usage
if __name__ == "__main__":
    # Generate or load the encryption key
    key = generate_key()  # Call this only once to generate the key
    # key = load_key()  # Use this after the key is generated

    # Store a Wi-Fi password
    store_wifi_credentials("MyHomeWiFi", "MySecurePassword123", key)

    # Retrieve a Wi-Fi password
    password = retrieve_wifi_credentials("MyHomeWiFi", key)
    print(f"Retrieved password: {password}")