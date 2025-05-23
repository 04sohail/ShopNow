"""migration

Revision ID: 006
Revises: 005
Create Date: 2025-04-11 23:19:04.131373

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '006'
down_revision: Union[str, None] = '005'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'id',
               existing_type=sa.BIGINT(),
               type_=sa.Integer(),
               existing_nullable=False,
               autoincrement=True)
    op.alter_column('users', 'user_type',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('users', 'status',
               existing_type=sa.BOOLEAN(),
               type_=sa.String(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'status',
               existing_type=sa.String(),
               type_=sa.BOOLEAN(),
               existing_nullable=False)
    op.alter_column('users', 'user_type',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('users', 'id',
               existing_type=sa.Integer(),
               type_=sa.BIGINT(),
               existing_nullable=False,
               autoincrement=True)
    # ### end Alembic commands ###
