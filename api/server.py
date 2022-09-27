from app import create_app


if __name__ == "__main__":
    instance = create_app()
    instance.run()
