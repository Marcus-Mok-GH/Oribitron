from backend.app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001) # Specify a port, e.g. 5001, to avoid conflict with React dev server
