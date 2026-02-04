import os
import uvicorn

# Get the directory where this script is located
_script_dir = os.path.dirname(os.path.abspath(__file__))
_project_root = os.path.abspath(os.path.join(_script_dir, "..", ".."))
_app_data_dir = os.path.join(_project_root, "app_data")

# Set environment variables using relative paths
os.environ["APP_DATA_DIRECTORY"] = _app_data_dir
os.environ["USER_CONFIG_PATH"] = os.path.join(_app_data_dir, "userConfig.json")
os.environ["PYTHONIOENCODING"] = "utf-8"
os.environ["PYTHONUTF8"] = "1"

if __name__ == "__main__":
    uvicorn.run(
        "api.main:app",
        host="127.0.0.1",
        port=8001,
        log_level="info",
        reload=False,
    )
