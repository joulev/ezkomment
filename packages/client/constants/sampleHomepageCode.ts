export const plainHtmlCode = `      <span>Last updated: 1 January 2022</span>
    </div>
  </section>
  <section id="comments">
    <iframe src="https://api.ezkomment.joulev.dev/..."></iframe>
  </section>
</article>
<footer class="footer">
  <div class="footer-left-column">`;

export const apiCode = `> const res = await fetcher(url, { page: "873e276648d48e4fd1e1" });
undefined
> res.status
200
> const { comments } = await res.json();
undefined
> comments
[
  {
    author: "John Doe",
    timestamp: "2020-06-01T12:00:00.000Z",
    content: "This is a comment",
  },
  ...
]`;
