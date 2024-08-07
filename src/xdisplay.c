#include "xdisplay.h"

#ifdef __STDC_ALLOC_LIB__
#define __STDC_WANT_LIB_EXT2__ 1
#else
#define _POSIX_C_SOURCE 200809L
#endif

#include <string.h> /* For strdup() */
#include <stdio.h> /* For fputs() */
#include <stdlib.h> /* For atexit() */

static Display *mainDisplay = NULL;
static char *displayName = NULL;
static int registered = 0;
static int hasDisplayNameChanged = 0;

Display *XGetMainDisplay(void)
{
	/* Close the display if displayName has changed */
	if (hasDisplayNameChanged) {
		XCloseMainDisplay();
		hasDisplayNameChanged = 0;
	}

	if (!mainDisplay) {
		mainDisplay = XOpenDisplay(displayName);

		if (!mainDisplay) {
			fputs("Could not open main display\n", stderr);
		} else if (!registered) {
			atexit(&XCloseMainDisplay);
			registered = 1;
		}
	}

	return mainDisplay;
}

void XCloseMainDisplay(void)
{
	if (mainDisplay) {
		XCloseDisplay(mainDisplay);
		mainDisplay = NULL;
	}
}

char *getXDisplay(void)
{
	return displayName;
}

void setXDisplay(const char *name)
{
    if (displayName) {
        free(displayName);
    }

    if (!name) {
        displayName = NULL;
    } else {
    	displayName = strdup(name);
    }

	hasDisplayNameChanged = 1;
}
