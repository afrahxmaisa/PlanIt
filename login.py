import hashlib
from flask import Flask, render_template

app = Flask(__name__)
@app.route("/")
def login():
    return render_template("login.html")


def signup():
    stored_email = input("Enter email address: ")
    pwd = input("Enter password: ")
    conf_pwd = input("Confirm password: ")

    if conf_pwd == pwd:
        enc = conf_pwd.encode()
        hash1 = hashlib.md5(enc).hexdigest()

        with open("credentials.txt", "w") as f:
            f.write({stored_email} +"\n")
            f.write(hash1)
        f.close()
        print("You have registered successfully")
        return stored_email
    else:
        print("Password does not match")
def login(stored_email):
    email = input("Enter email: ")
    pwd = input("Enter password: ")
    
    auth = pwd.encode()
    auth_hash = hashlib.md5(auth).hexdigest()
    with open("credentials.txt", "r") as f:
        stored_pwd = f.read().split("\n")
    f.close()

    if email == stored_email and auth_hash == stored_pwd:
        print("Login in successful")
    else:
        print("Login failed: \n")

while 1:
    print("******* Login System **********")
    print("1.Signup")
    print("2.Login")
    print("3.Exit")
    ch = int(input("Enter which action you want to take: "))
    if ch== 1:
        signup()
    elif ch ==2:
        login()
    elif ch==3:
        break
    else:
        print("Sorry, this action does not exist")
    
    
if __name__ == "__main__":
    app.run(debug=True)