import tkinter as tk
from tkinter import messagebox
from cryptography.fernet import Fernet
import json
import os

# Generate a key for encryption (save this key securely!)
def generate_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)
    return key

# Load the encryption key
def load_key():
    if not os.path.exists("secret.key"):
        generate_key()
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
                return None
    except FileNotFoundError:
        return None

# GUI Application
class WiFiPasswordManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Wi-Fi Password Manager")
        self.key = load_key()

        # GUI Elements
        self.label_ssid = tk.Label(root, text="Wi-Fi SSID:")
        self.label_ssid.grid(row=0, column=0, padx=10, pady=10)

        self.entry_ssid = tk.Entry(root, width=30)
        self.entry_ssid.grid(row=0, column=1, padx=10, pady=10)

        self.label_password = tk.Label(root, text="Wi-Fi Password:")
        self.label_password.grid(row=1, column=0, padx=10, pady=10)

        self.entry_password = tk.Entry(root, width=30, show="*")
        self.entry_password.grid(row=1, column=1, padx=10, pady=10)

        self.button_store = tk.Button(root, text="Store Password", command=self.store_password)
        self.button_store.grid(row=2, column=0, columnspan=2, pady=10)

        self.button_retrieve = tk.Button(root, text="Retrieve Password", command=self.retrieve_password)
        self.button_retrieve.grid(row=3, column=0, columnspan=2, pady=10)

    def store_password(self):
        ssid = self.entry_ssid.get()
        password = self.entry_password.get()

        if not ssid or not password:
            messagebox.showwarning("Input Error", "Please enter both SSID and Password.")
            return

        store_wifi_credentials(ssid, password, self.key)
        messagebox.showinfo("Success", "Wi-Fi credentials stored successfully!")
        self.entry_ssid.delete(0, tk.END)
        self.entry_password.delete(0, tk.END)

    def retrieve_password(self):
        ssid = self.entry_ssid.get()

        if not ssid:
            messagebox.showwarning("Input Error", "Please enter the SSID.")
            return

        password = retrieve_wifi_credentials(ssid, self.key)
        if password:
            messagebox.showinfo("Retrieved Password", f"Password for {ssid}: {password}")
        else:
            messagebox.showwarning("Not Found", f"No password found for SSID: {ssid}")

# Run the application
if __name__ == "__main__":
    root = tk.Tk()
    app = WiFiPasswordManagerApp(root)
    root.mainloop()