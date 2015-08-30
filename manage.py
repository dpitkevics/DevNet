#!/usr/bin/env python
import os
import sys
from subprocess import Popen

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DevNet.settings")

    from django.core.management import execute_from_command_line

    process = Popen(['node', 'nodejs/server.js'])

    execute_from_command_line(sys.argv)

    process.terminate()
