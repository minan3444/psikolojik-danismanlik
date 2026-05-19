import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function AppBreadcrumb({ items = [] }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 1, color: "text.secondary" }}
    >
      {items.map(({ label, href }) =>
        href ? (
          <Link
            key={label}
            href={href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {label}
          </Link>
        ) : (
          <Typography key={label} color="text.primary" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
