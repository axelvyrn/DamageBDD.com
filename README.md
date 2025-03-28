### DamageBDD Product Web Site

This repository contains the source files for the product page of [DamageBDD](https://damagebdd.com), a Behavior-Driven Development (BDD) framework at scale, leveraging the power of Emacs and Org mode. The site is generated using `org-publish`, a tool within Emacs that converts Org files into a static HTML site. The project follows a clean, minimalist approach, reflecting DamageBDD's commitment to transparent and verifiable software behavior.

### Instructions for Generating the Site


To generate the site from your Org files using the provided `org-publish` configuration, follow these steps:

```bash
git clone https://github.com/DamageBDD/DamageBDD.com
cd DamageBDD.com
```
  
```bash
emacs --batch \
      -l ~/Org/damagebdd/publish.el \
      --eval "(org-publish-project \"damagebdd\" t)"
```

with docker 

```bash
docker run emacs:latest  --batch \
      -l ~/Org/damagebdd/publish.el \
      --eval "(org-publish-project \"damagebdd\" t)"
```
