# Git-SuperClass

A static site directory of user profiles for SuperClass, organized by role.

## Overview

Profiles are organized into roles:

- **Teachers** — profile pages for teaching staff
- **Students** — profile pages for students (coming soon)

## Project Structure

```
index.html          Landing page listing profiles by role
style.css            Shared styles for the landing page
profiles/
  singleton/
    teacher.html     A teacher profile page
    style.css         Styles for the profile page
```

## Getting Started

Open [index.html](index.html) directly in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

Then navigate to the local URL shown in the terminal.

## Adding a New Profile

1. Create a new folder under `profiles/` (e.g., `profiles/jane-doe/`).
2. Add a profile page and `style.css` following the structure of `profiles/singleton/`.
3. Link the new page from the appropriate role section in [index.html](index.html).

## License

This project is for educational purposes.